import { FormattedMessage } from "react-intl";

const CommonLabels = {
  TOTAL: (
    <FormattedMessage
      id="card.total_eaten"
      defaultMessage="Total eaten: "
    />
  ),
  REMAINING: (
    <FormattedMessage
      id="card.remaining"
      defaultMessage="Remaining: "
    />
  ),
  MEAL: (
    <FormattedMessage
      id="card.meal"
      defaultMessage="Meal: "
    />
  ),
  INSTRUCTION: (
    <FormattedMessage
      id="card.instruction"
      defaultMessage="( Click here to record meal )"
    />
  ),
}

export { CommonLabels }