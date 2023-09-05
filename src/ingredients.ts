import { shuffle } from "./utils";
import { theme } from "./theme";

class Ingredient {
  id: string;
  name: string;
  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = theme.ids.potion(id);
    this.name = name;
    this.color = color;
  }
}

export function generateIngredients() {
  const names = [
    "Frog Paw",
    "Salamander Tail",
    "Cat Paw",
    "Rat Tooth",
    "Devil's Herb",
    "Barracuda Eyes",
  ];
  const colors = [
    "#ff6600",
    "#ff0000",
    "#ccff00",
    "#d4aa00",
    "#ff0066",
    "#5fd38d",
  ];
  shuffle(colors);
  shuffle(names);
  return colors.map(
    (color, index) => new Ingredient(index, names[index], color),
  );
}
