interface GlobalEventHandlersEventMap {
  reset: CustomEvent;
  notify: CustomEvent<{ messages: string[]; onDismissed?: () => void }>;
  dismiss: CustomEvent;
  newLevel: CustomEvent<{ level: Level }>;
  scoreMaxed: CustomEvent;
  levelComplete: CustomEvent;
  potionClick: CustomEvent<{ ingredient: Ingredient }>;
  potionRelease: CustomEvent<{ ingredient: Ingredient }>;
  cauldronDrop: CustomEvent<{ ingredient: Ingredient }>;
  cauldronPrepared: CustomEvent<{ ingredient: Ingredient }>;
  patientCalled: CustomEvent<{ patient: Patient }>;
  patientDone: CustomEvent<{ patient: Patient }>;
  patientLeave: CustomEvent<{ patient: Patient }>;
  gameOver: CustomEvent;
}
