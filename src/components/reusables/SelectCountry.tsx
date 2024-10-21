import React from "react";
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";

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
  };

  return (
    <Select
      size="lg"
      label="Where is our business located?"
      placeholder="Select Country"
      className="w-full"
      menuProps={{
        className: "bg-primary text-white top-0!",
        style: { top: "0!important" },
      }}
      labelProps={{
        className: "top-0!",
        style: { top: "0!important" },
      }}
      variant="static"
      value={country}
      offset={0}
      onChange={(e) => {
        setCountry(e);
      }}
      selected={(element) =>
        element &&
        React.cloneElement(element, {
          disabled: true,
          className:
            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
        })
      }
    >
      {countries.map(({ name, flags }) => (
        <Option key={name} value={name} className="flex items-center gap-2">
          <img
            src={flags.png}
            alt={name}
            className="h-6 w-6 rounded-full object-cover"
          />
          {name}
        </Option>
      ))}
    </Select>
  );
}
