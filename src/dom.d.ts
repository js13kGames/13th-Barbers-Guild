interface GlobalEventHandlersEventMap {
  reset: CustomEvent;
  notify: CustomEvent<{ messages: string[]; onDismissed?: () => void }>;
  dismiss: CustomEvent;
  newLevel: CustomEvent<{ level: Level }>;
  potionClick: CustomEvent<{ color: string }>;
  potionRelease: CustomEvent<{ color: string }>;
  cauldronDrop: CustomEvent<{ color: string }>;
  cauldronPrepared: CustomEvent<{ color: string }>;
}
