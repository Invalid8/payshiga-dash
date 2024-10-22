import { Select, SelectItem } from "@nextui-org/select";
import { useCountries } from "use-react-countries";

type Country = { name: string; flags: { svg: string; png: string } };

export default function CountriesSelect({
  country,
  setCountry,
}: {
  country?: string;
  setCountry: (value?: string) => void;
}) {
  const { countries } = useCountries() as {
    countries: Country[];
    loading: boolean;
  };

  return (
    <Select
      size="lg"
      items={countries.slice(0,30)}
      label="Where is our business located?"
      placeholder="Select Country"
      className="w-full"
      classNames={{
        trigger: "border-none",
        listboxWrapper: "bg-primary text-white rounded-lg",
      }}
      variant="faded"
      value={country}
      onChange={(e) => {
        setCountry(e.target.value);
      }}
      isRequired
      labelPlacement="outside"
      renderValue={(items) => {
        return items.map((item) => (
          <span className="flex items-center gap-2">
            <img
              src={item.data?.flags.png}
              alt={item.data?.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{item.data?.name}</span>
          </span>
        ));
      }}
    >
      {(country) => (
        <SelectItem
          key={country.name}
          value={country.name}
          textValue={country.name}
        >
          <span className="flex items-center gap-2">
            <img
              src={country.flags.png}
              alt={country.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{country.name}</span>
          </span>
        </SelectItem>
      )}
    </Select>
  );
}
