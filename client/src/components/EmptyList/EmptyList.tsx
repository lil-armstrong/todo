import { Text, Title } from "@mantine/core";

const EmptyList = () => {
  return (
    <div data-testid="empty-list">
      <picture>
        {/* <img src="" alt="" /> */}
      </picture>

      <Title order={5}>No task yet</Title>
      <Text>Add your to-dos and keep track of them</Text>
    </div>
  );
};

export default EmptyList;
