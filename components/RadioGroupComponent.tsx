import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRadioSelection } from "@/store/store";

const RadioGroupComponent = () => {
  const [radioSelection, setRadioSelection] = useRadioSelection((state) => [
    state.radioSelection,
    state.setRadioSelection,
  ]);

  return (
    <RadioGroup
      defaultValue="compact"
      onValueChange={(value: string) => setRadioSelection(value)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r1" />
        <Label htmlFor="r3">Compact</Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="expanded" id="r2" />
        <Label htmlFor="r2">Expanded</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroupComponent;
