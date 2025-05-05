import { Text, Title } from "@mantine/core";
import cn from "./style.module.css";

const EmptyList = () => {
  return (
    <div data-testid="empty-list" className={cn.container}>
      <picture>
        {/* <img src="" alt="" /> */}
      </picture>

      <Title order={3}>No task yet</Title>
      <Text className={cn.description}>Add your to-dos and keep track of them</Text>
    </div>
  );
};

export default EmptyList;
