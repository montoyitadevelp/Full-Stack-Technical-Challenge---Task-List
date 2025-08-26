import { FormItemEditableText } from "@/components/form"
import { Col, Flex, Row } from "antd"

interface TaskTitleProps {
    isLoading: boolean | undefined
}

export const TaskTitle = ({ isLoading }: TaskTitleProps) => {
    return <Row>
        <Col span={24}>
            <Flex gap={16}>
                <Col span={24}>
                    <Flex gap={16}>
                        <FormItemEditableText
                            loading={isLoading}
                            formItemProps={{
                                name: "titulo",
                                label: "Título",
                                rules: [{ required: true }],
                            }}
                        />
                    </Flex>
                </Col>
            </Flex>
        </Col>
    </Row>
}