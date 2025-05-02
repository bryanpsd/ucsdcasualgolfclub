import * as Select from '@radix-ui/react-select'

export const BasicSelect = ({
  items,
  value,
  onValueChange,
}: {
  onValueChange: () => void
  value: string
  items: { text: string; value: string }[]
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger asChild>
        <div>
          <Select.Value />
          <Select.Icon />
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {items.map(({ text, value }) => (
              <Select.Item value={value} key={value}>
                {text}
              </Select.Item>
            ))}
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
