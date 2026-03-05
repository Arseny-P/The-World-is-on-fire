type selectType = {
  options: {
    value: string,
    name: string,
  }[],
  defaultValue: string,
  value: string | number,
  onChange: (val: string) => void,
}

const MySelect = ({options, defaultValue, value, onChange}: selectType) => {
  return (
    <select className="filter" value={value} onChange={event => onChange(event.target.value)}>
      <option className="filter__option" disabled={true} value="">{defaultValue}</option>
        {options.map(option =>
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
        )}
    </select>
  )
}

export default MySelect