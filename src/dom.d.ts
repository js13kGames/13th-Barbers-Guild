interface GlobalEventHandlersEventMap {
  reset: CustomEvent;
  potionClick: CustomEvent<{ color: string }>;
  potionRelease: CustomEvent<{ color: string }>;
  cauldronDrop: CustomEvent<{color: string }>;
  cauldronPrepared: CustomEvent<{color: string }>;
}
