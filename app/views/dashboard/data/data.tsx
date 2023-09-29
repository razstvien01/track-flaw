import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const roles = [
  {
    value: "ADMIN",
    label: "Admin",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "MANAGER",
    label: "Manager",
    icon: CircleIcon,
  },
  {
    value: "TESTER",
    label: "Tester",
    icon: StopwatchIcon,
  },
  {
    value: "DEVELOPER",
    label: "Developer",
    icon: CheckCircledIcon,
  },
]
