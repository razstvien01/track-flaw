import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  Crosshair1Icon,
  Crosshair2Icon,
  TargetIcon,
  DiscIcon
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

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
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

export const severities = [
  {
    label: "Critical",
    value: "critical",
    icon: Crosshair1Icon,
  },
  {
    label: "High",
    value: "high",
    icon: Crosshair2Icon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: TargetIcon,
  },
  {
    label: "Low",
    value: "low",
    icon: DiscIcon
  },
  {
    label: "Trivial",
    value: "trivial",
    icon: DiscIcon
  },
]