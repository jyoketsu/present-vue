import type { Meta, StoryObj } from "@storybook/vue3";

import Example from "./Example1.vue";

const meta = {
  title: "Example/Present",
  component: Example,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Number: Story = {};
