export const TaskColumnTitle = ({ record }: { record: any }) => (
    <div>
        <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.titulo}</div>
        {record.descripcion && (
            <div style={{ fontSize: 12, color: "#666", opacity: 0.8 }}>
                {record.descripcion.length > 50
                    ? `${record.descripcion.substring(0, 50)}...`
                    : record.descripcion}
            </div>
        )}
    </div>
);
