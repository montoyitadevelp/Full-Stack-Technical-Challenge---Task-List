import { Tag } from "antd";
import { AnyObject } from "antd/es/_util/type";

export const TaskColumnCategory = ({ record }: AnyObject) =>
  record.categoria ? (
    <Tag color={record.categoria.color || "blue"}>{record.categoria.nombre}</Tag>
  ) : (
    "-"
  );
