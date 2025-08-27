
---

## 1) Participación: promedio de tareas creadas/usuario (últimos 30 días vs 30 días previos)

```sql
-- Promedio entre usuarios activos en cada ventana (usuarios con ≥1 tarea creada en la ventana)
WITH limites AS (
  SELECT 
    (NOW() - INTERVAL '30 days') AS start_30d,
    (NOW() - INTERVAL '60 days') AS start_60d,
    (NOW() - INTERVAL '1 day')  AS start_1d,
    (NOW() - INTERVAL '2 day')  AS start_2d,
    (NOW() - INTERVAL '1 hour') AS start_1h,
    (NOW() - INTERVAL '2 hour') AS start_2h,
    NOW() AS end_now
),
per_user AS (
  SELECT 
    t."usuarioId",
    SUM(CASE WHEN t."createdAt" >= l.start_30d AND t."createdAt" < l.end_now THEN 1 ELSE 0 END) AS creadas_30d,
    SUM(CASE WHEN t."createdAt" >= l.start_60d AND t."createdAt" < l.start_30d THEN 1 ELSE 0 END) AS creadas_30d_prev,
    SUM(CASE WHEN t."createdAt" >= l.start_1d AND t."createdAt" < l.end_now THEN 1 ELSE 0 END) AS creadas_1d,
    SUM(CASE WHEN t."createdAt" >= l.start_2d AND t."createdAt" < l.start_1d THEN 1 ELSE 0 END) AS creadas_1d_prev,
    SUM(CASE WHEN t."createdAt" >= l.start_1h AND t."createdAt" < l.end_now THEN 1 ELSE 0 END) AS creadas_1h,
    SUM(CASE WHEN t."createdAt" >= l.start_2h AND t."createdAt" < l.start_1h THEN 1 ELSE 0 END) AS creadas_1h_prev
  FROM tarea t
  CROSS JOIN limites l
  GROUP BY t."usuarioId"
),
res AS (
  SELECT
    COALESCE(
      AVG(NULLIF(creadas_30d,0))::numeric(10,2),
      AVG(NULLIF(creadas_1d,0))::numeric(10,2),
      AVG(NULLIF(creadas_1h,0))::numeric(10,2)
    ) AS promedio_cur,
    COALESCE(
      AVG(NULLIF(creadas_30d_prev,0))::numeric(10,2),
      AVG(NULLIF(creadas_1d_prev,0))::numeric(10,2),
      AVG(NULLIF(creadas_1h_prev,0))::numeric(10,2)
    ) AS promedio_prev
  FROM per_user
)
SELECT
  promedio_cur,
  promedio_prev,
  (promedio_cur - promedio_prev) AS diferencia_abs,
  CASE WHEN promedio_prev > 0
       THEN ROUND(100 * (promedio_cur - promedio_prev) / promedio_prev, 2)
       ELSE NULL
  END AS diferencia_pct
FROM res;
```

---

## 2) Tendencias: tasa de completado diaria por prioridad (últimos 90 días)

> Tasa = completadas en el día / creadas en el mismo día y prioridad.

```sql
WITH dias AS (
  SELECT generate_series(CURRENT_DATE - INTERVAL '89 days', CURRENT_DATE, INTERVAL '1 day')::date AS dia
),
prioridades AS (
  SELECT unnest(enum_range(NULL::"TaskPriority")) AS prioridad
),
rejilla AS (
  SELECT d.dia, p.prioridad FROM dias d CROSS JOIN prioridades p
),
creadas AS (
  SELECT date_trunc('day', t."createdAt")::date AS dia, t."prioridad", COUNT(*) AS creadas
  FROM tarea t
  WHERE t."createdAt" >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY 1,2
),
completadas AS (
  SELECT date_trunc('day', t."completedAt")::date AS dia, t."prioridad", COUNT(*) AS completadas
  FROM tarea t
  WHERE t."completedAt" IS NOT NULL
    AND t."completedAt" >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY 1,2
)
SELECT
  r.dia,
  r.prioridad,
  COALESCE(c.creadas, 0)     AS creadas,
  COALESCE(cm.completadas,0) AS completadas,
  CASE WHEN COALESCE(c.creadas,0) > 0
       THEN ROUND( COALESCE(cm.completadas,0)::numeric / c.creadas * 100, 2)
       ELSE NULL
  END AS tasa_completado_pct
FROM rejilla r
LEFT JOIN creadas c  ON c.dia = r.dia AND c."prioridad" = r.prioridad
LEFT JOIN completadas cm ON cm.dia = r.dia AND cm."prioridad" = r.prioridad
ORDER BY r.dia, r.prioridad;
```

---

## 3) Rendimiento por categoría: tasa de completado y tiempo medio de ciclo

```sql
SELECT
  COALESCE(c."nombre", 'Sin categoría') AS categoria,
  COUNT(*) AS total_tareas,
  COUNT(*) FILTER (WHERE t."completada") AS tareas_completadas,
  ROUND( (COUNT(*) FILTER (WHERE t."completada")::numeric / NULLIF(COUNT(*),0)) * 100, 2) AS tasa_completado_pct,
  -- tiempo medio desde creación a completado (solo tareas completadas), en horas
  ROUND( AVG( EXTRACT(EPOCH FROM (t."completedAt" - t."createdAt")) ) / 3600, 2 ) AS horas_promedio_para_completar
FROM tarea t
LEFT JOIN categoria c ON c."id" = t."categoriaId"
GROUP BY categoria
ORDER BY tasa_completado_pct DESC NULLS LAST;
```

---

## 4) Patrones de productividad: horas pico y días de la semana (creación vs completado)

```sql
WITH eventos AS (
  SELECT 'creacion'::text AS tipo, t."createdAt" AS ts FROM tarea t
  UNION ALL
  SELECT 'completado'::text AS tipo, t."completedAt" AS ts FROM tarea t WHERE t."completedAt" IS NOT NULL
),
base AS (
  SELECT
    tipo,
    EXTRACT(DOW  FROM ts)::int AS dia_semana,  -- 0=domingo
    EXTRACT(HOUR FROM ts)::int AS hora,
    COUNT(*) AS total
  FROM eventos
  GROUP BY 1,2,3
)
SELECT
  tipo,
  dia_semana,
  hora,
  total,
  ROUND( 100 * total::numeric / SUM(total) OVER (PARTITION BY tipo), 2) AS porcentaje_del_tipo
FROM base
ORDER BY tipo, total DESC, dia_semana, hora;
```

---

## 5) Análisis de tareas vencidas: conteo y días promedio vencidos por usuario y categoría (estado actual)

```sql
SELECT
  u."nombre"                          AS usuario,
  COALESCE(c."nombre", 'Sin categoría') AS categoria,
  COUNT(*)                            AS tareas_vencidas,
  ROUND( AVG( EXTRACT(EPOCH FROM (NOW() - t."fechaVencimiento")) ) / 86400, 2) AS dias_promedio_vencidos
FROM tarea t
JOIN usuario u   ON u."id" = t."usuarioId"
LEFT JOIN categoria c ON c."id" = t."categoriaId"
WHERE t."completada" = FALSE
  AND t."fechaVencimiento" IS NOT NULL
  AND t."fechaVencimiento" < NOW()
GROUP BY u."nombre", categoria
ORDER BY tareas_vencidas DESC, u."nombre";
```

---

## 6) Uso de etiquetas: frecuencia y tasa de completado asociada

```sql
SELECT
  e."nombre" AS etiqueta,
  COUNT(DISTINCT te."tareaId") AS tareas_con_etiqueta,
  COUNT(DISTINCT te."tareaId") FILTER (WHERE t."completada") AS tareas_completadas,
  ROUND( (COUNT(DISTINCT te."tareaId") FILTER (WHERE t."completada")::numeric / NULLIF(COUNT(DISTINCT te."tareaId"),0)) * 100, 2 ) AS tasa_completado_pct,
  MAX(te."createdAt") AS ultima_asignacion
FROM etiqueta e
JOIN tareaetiqueta te ON te."etiquetaId" = e."id"
JOIN tarea t ON t."id" = te."tareaId"
GROUP BY e."nombre"
ORDER BY tareas_con_etiqueta DESC, e."nombre";
```

---

## 7) Retención de usuarios (últimas 4 semanas)

**7A. Usuarios con actividad (≥1 tarea creada) en cada una de las últimas 4 semanas**

```sql
WITH semanas AS (
  SELECT generate_series(
           date_trunc('week', CURRENT_DATE)::date - INTERVAL '3 weeks',
           date_trunc('week', CURRENT_DATE)::date,
           INTERVAL '1 week'
         )::date AS semana_ini
),
activity AS (
  SELECT t."usuarioId", date_trunc('week', t."createdAt")::date AS semana_ini
  FROM tarea t
  WHERE t."createdAt" >= date_trunc('week', CURRENT_DATE)::date - INTERVAL '3 weeks'
),
usuarios_4_de_4 AS (
  SELECT a."usuarioId"
  FROM activity a
  GROUP BY a."usuarioId"
  HAVING COUNT(DISTINCT a.semana_ini) = 4
)
SELECT COUNT(*) AS usuarios_activos_4_sem_seguidas
FROM usuarios_4_de_4;
```
---

## 8) Distribución de prioridad para usuarios activos

> *Supuesto:* "usuarios activos" = usuarios con creación o completado de tareas en los últimos 7 días. Se calcula la distribución de **tareas abiertas** por prioridad para dichos usuarios.

```sql
WITH usuarios_activos AS (
  SELECT DISTINCT t."usuarioId"
  FROM tarea t
  WHERE t."createdAt"  >= NOW() - INTERVAL '7 days'
     OR t."completedAt" >= NOW() - INTERVAL '7 days'
),
_tot AS (
  SELECT COUNT(*) AS total
  FROM tarea t
  WHERE t."usuarioId" IN (SELECT "usuarioId" FROM usuarios_activos)
    AND t."completada" = FALSE
)
SELECT
  t."prioridad",
  COUNT(*) AS tareas_abiertas,
  ROUND( COUNT(*)::numeric / NULLIF((SELECT total FROM _tot),0) * 100, 2) AS porcentaje_sobre_total
FROM tarea t
WHERE t."usuarioId" IN (SELECT "usuarioId" FROM usuarios_activos)
  AND t."completada" = FALSE
GROUP BY t."prioridad"
ORDER BY t."prioridad";
```

---

## 9) Tendencias estacionales: creación y completado por mes (últimos 12 meses)

```sql
WITH meses AS (
  SELECT date_trunc('month', (CURRENT_DATE - INTERVAL '11 months'))::date AS start
),
serie AS (
  SELECT (start + (n || ' months')::interval)::date AS mes
  FROM meses, generate_series(0, 11) AS g(n)
),
creadas AS (
  SELECT date_trunc('month', t."createdAt")::date AS mes, COUNT(*) AS creadas
  FROM tarea t
  WHERE t."createdAt" >= (SELECT start FROM meses)
  GROUP BY 1
),
completadas AS (
  SELECT date_trunc('month', t."completedAt")::date AS mes, COUNT(*) AS completadas
  FROM tarea t
  WHERE t."completedAt" IS NOT NULL
    AND t."completedAt" >= (SELECT start FROM meses)
  GROUP BY 1
)
SELECT
  s.mes,
  COALESCE(c.creadas,0)      AS tareas_creadas,
  COALESCE(cm.completadas,0) AS tareas_completadas
FROM serie s
LEFT JOIN creadas c   ON c.mes = s.mes
LEFT JOIN completadas cm ON cm.mes = s.mes
ORDER BY s.mes;
```

---

## 10) Benchmarking: top 10% por tasa de completado + promedio de tareas simultáneas (ventana 90 días)

> Ventana configurable (90 días). "Promedio de tareas simultáneas" = promedio diario de tareas abiertas (creadas ≤ día y sin completar aún ese día) dentro de la ventana.

```sql
WITH params AS (
  SELECT (CURRENT_DATE - INTERVAL '90 days')::timestamp AS inicio,
         (CURRENT_DATE + INTERVAL '1 day')::timestamp AS fin 
),
por_usuario AS (
  SELECT
    t."usuarioId",
    COUNT(*) FILTER (WHERE t."createdAt" >= p.inicio AND t."createdAt" < p.fin) AS creadas_ventana,
    COUNT(*) FILTER (
      WHERE t."createdAt" >= p.inicio AND t."createdAt" < p.fin AND t."completada" = TRUE
    ) AS completadas_ventana
  FROM tarea t
  CROSS JOIN params p
  GROUP BY t."usuarioId"
),
tasa AS (
  SELECT
    u."usuarioId",
    creadas_ventana,
    completadas_ventana,
    CASE WHEN creadas_ventana > 0
         THEN completadas_ventana::numeric / creadas_ventana
         ELSE 0
    END AS tasa_completado
  FROM por_usuario u
),
umbral AS (
  SELECT percentile_disc(0.9) WITHIN GROUP (ORDER BY tasa_completado) AS p90
  FROM tasa
  WHERE creadas_ventana > 0
),
days AS (
	SELECT generate_series(
           (SELECT inicio FROM params)::date,
           (SELECT fin FROM params) - INTERVAL '1 day',
           INTERVAL '1 day'
         )::date AS dia
),
-- Tareas que están activas en algún momento de la ventana
relevantes AS (
  SELECT t."id", t."usuarioId", t."createdAt", t."completedAt"
  FROM tarea t
  CROSS JOIN params p
  WHERE t."createdAt" <= p.fin
    AND (t."completedAt" IS NULL OR t."completedAt" >= p.inicio)
),
-- Conteo diario de tareas abiertas por usuario
abiertas_por_dia AS (
  SELECT
    d.dia,
    r."usuarioId",
    COUNT(*) AS abiertas
  FROM days d
  JOIN relevantes r
    ON r."createdAt" <= d.dia + INTERVAL '1 day' - INTERVAL '1 microsecond'
   AND (r."completedAt" IS NULL OR r."completedAt" > d.dia + INTERVAL '1 day' - INTERVAL '1 microsecond')
  GROUP BY d.dia, r."usuarioId"
),
promedio_abiertas AS (
  SELECT
    a."usuarioId",
    ROUND(AVG(a.abiertas)::numeric, 2) AS promedio_tareas_simultaneas
  FROM abiertas_por_dia a
  GROUP BY a."usuarioId"
)
SELECT
  u."nombre" AS usuario,
  t.tasa_completado,
  t.creadas_ventana,
  t.completadas_ventana,
  pa.promedio_tareas_simultaneas
FROM tasa t
JOIN usuario u ON u."id" = t."usuarioId"
LEFT JOIN promedio_abiertas pa ON pa."usuarioId" = t."usuarioId"
WHERE t.creadas_ventana > 0
  AND t.tasa_completado >= (SELECT p90 FROM umbral)
ORDER BY t.tasa_completado DESC, u."nombre";
```

---

## (Opcional) Índices sugeridos para acelerar las consultas

```sql
-- Actividad por usuario/fechas
CREATE INDEX IF NOT EXISTS idx_tarea_usuario_created ON tarea ("usuarioId", "createdAt");
CREATE INDEX IF NOT EXISTS idx_tarea_usuario_completed ON tarea ("usuarioId", "completedAt") WHERE "completedAt" IS NOT NULL;

-- Consultas por prioridad/categoría/estado
CREATE INDEX IF NOT EXISTS idx_tarea_prioridad_created ON tarea ("prioridad", "createdAt");
CREATE INDEX IF NOT EXISTS idx_tarea_categoria ON tarea ("categoriaId");
CREATE INDEX IF NOT EXISTS idx_tarea_overdue ON tarea ("fechaVencimiento") WHERE "completada" = FALSE AND "fechaVencimiento" IS NOT NULL;

-- M2M etiquetas
CREATE INDEX IF NOT EXISTS idx_tareaetiqueta_etiqueta_tarea ON tareaetiqueta ("etiquetaId", "tareaId");
```

> Nota: En la consulta **8** asumimos "usuarios activos" por actividad (no hay tabla de logins). Si tienes una tabla de sesiones/logins, cambiamos el CTE `usuarios_activos` para usarla.

