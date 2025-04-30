import { formatDate } from "@/lib/date";
import {
  Checkbox,
  Container,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { BiSolidStar } from "react-icons/bi";
import style from "./style.module.css";
import { ITaskListProps } from "./types";
import clsx from "clsx";

const TaskListItem = ({ item }: ITaskListProps) => {
  return (
    <Container
      data-testid={`task-${item.id}`}
      aria-checked={item.completed}
      fluid
      w="100%"
      className={clsx(style.container, {
        [style.completed]: item.completed,
      })}
    >
      <div className={style.containerInner}>
        <Checkbox radius={20} size="lg" defaultChecked={item.completed} />
        <section className={style.contentWrapper}>
          <Title order={5} className={style.title}>
            {item.title}
          </Title>
          <Text size="xs" className={style.description}>
            {item.description}
          </Text>
          <Text size="sm">{formatDate(item.updatedAt)}</Text>
        </section>
        {!item.completed && (
          <UnstyledButton
            className={style.favBtn}
            variant="transparent"
            aria-label="Favourite"
          >
            <BiSolidStar
              fill="transparent"
              strokeWidth="1"
              style={{ width: "100%", height: "100%" }}
            />
          </UnstyledButton>
        )}
      </div>
    </Container>
  );
};

export default TaskListItem;
