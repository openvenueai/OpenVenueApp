export function buildSetupChecklist(options: {
  hasInHouseCatering: boolean
  venueCount: number
}) {
  const { hasInHouseCatering, venueCount } = options

  return [
    { id: "venue-details", label: "Confirm venue details", complete: true },
    {
      id: "spaces",
      label: venueCount > 1 ? "Review venues and spaces" : "Review spaces",
      complete: true,
    },
    { id: "plan", label: "Choose or confirm plan", complete: true },
    {
      id: "menus",
      label: "Set up menus",
      complete: !hasInHouseCatering,
    },
    {
      id: "pricing",
      label: "Add pricing items",
      complete: false,
    },
    {
      id: "email",
      label: "Connect business email",
      complete: false,
    },
    {
      id: "team",
      label: "Invite team members",
      complete: false,
    },
    {
      id: "templates",
      label: "Customize templates",
      complete: false,
    },
    {
      id: "settings",
      label: "Review account settings",
      complete: false,
    },
  ]
}
