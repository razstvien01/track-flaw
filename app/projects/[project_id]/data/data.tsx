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

export const statuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "TODO",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "IN PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: ArrowUpIcon,
  },
]

export const severities = [
  {
    label: "Critical",
    value: "CRITICAL",
    icon: Crosshair1Icon,
  },
  {
    label: "High",
    value: "HIGH",
    icon: Crosshair2Icon,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: TargetIcon,
  },
  {
    label: "Low",
    value: "LOW",
    icon: DiscIcon
  },
  {
    label: "Trivial",
    value: "TRIVIAL",
    icon: DiscIcon
  },
]