interface GlobalEventHandlersEventMap {
  potionClick: CustomEvent<{ color: string }>;
  potionRelease: CustomEvent<{ color: string }>;
  cauldronDrop: CustomEvent<{color: string }>;
}
