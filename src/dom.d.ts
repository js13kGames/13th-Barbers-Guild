interface GlobalEventHandlersEventMap {
  reset: CustomEvent;
  notify: CustomEvent<{ messages: string[]; onDismissed?: () => void }>;
  dismiss: CustomEvent;
  newLevel: CustomEvent<{ level: Level }>;
  potionClick: CustomEvent<{ ingredient: Ingredient }>;
  potionRelease: CustomEvent<{ ingredient: Ingredient }>;
  cauldronDrop: CustomEvent<{ ingredient: Ingredient }>;
  cauldronPrepared: CustomEvent<{ ingredient: Ingredient }>;
}
