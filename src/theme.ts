export const theme = {
  bg: "rgb(36,28,28)",
  bg0: "rgba(36,28,28,0)",
  bg5: "rgba(36,28,28,0.02)",
  wall: "rgb(108,83,83)",
  brick: "rgba(0,0,0,0.1)",
  l: "rgba(255,0,255,1)",
  shelfFront: "rgb(53,39,39)",
  shelfSide: "rgb(39,29,29)",
  shelfBottom: "rgb(24,18,18)",
  potionCap: "#520",
  potionCork: "#a40",
  black: (opacity: number = 1) => `rgba(0,0,0,${opacity})`,
  black50: "rgba(0,0,0,0.5)", // TODO use black
  black30: "rgba(0,0,0,0.3)", // TODO use black
  character: "#f4e08e",
  white: (opacity: number = 1) => `rgba(255,255,255,${opacity})`,
  layers: {
    potion: "10",
    shelf: "20",
    activePotion: "30",
    cauldronLight: "40",
    notification: "50",
    patient: "60",
  },
};
