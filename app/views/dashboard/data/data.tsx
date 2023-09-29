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

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

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

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]