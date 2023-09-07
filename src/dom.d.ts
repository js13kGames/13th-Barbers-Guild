interface GlobalEventHandlersEventMap {
  reset: CustomEvent;
  notify: CustomEvent<{ id: string; messages: string[] }>;
  dismiss: CustomEvent;
  dismissed: CustomEvent<{ id: string }>;
  newLevel: CustomEvent;
  potionClick: CustomEvent<{ color: string }>;
  potionRelease: CustomEvent<{ color: string }>;
  cauldronDrop: CustomEvent<{ color: string }>;
  cauldronPrepared: CustomEvent<{ color: string }>;
}
