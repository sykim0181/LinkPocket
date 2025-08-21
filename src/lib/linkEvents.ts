"use client";

import { LinkRecord } from "@/types/link";

export enum LINK_EVENT {
  "LINKS_CHANGED",
}

export type RepoEvents = {
  [LINK_EVENT.LINKS_CHANGED]:
    | { op: "add"; record: LinkRecord }
    | { op: "update"; record: LinkRecord }
    | { op: "delete"; id: string };
};

type EventName = LINK_EVENT;

class LinkEvents {
  private et: EventTarget;

  constructor() {
    this.et = new EventTarget();
  }

  public emit<T extends EventName>(eventName: T, eventDetail: RepoEvents[T]) {
    this.et.dispatchEvent(
      new CustomEvent(LINK_EVENT[eventName], { detail: eventDetail })
    );
  }

  public on<T extends EventName>(
    eventName: T,
    listener: (detail: RepoEvents[T]) => void
  ) {
    const type = LINK_EVENT[eventName];
    const eventListener = (e: Event) => listener((e as CustomEvent).detail);
    this.et.addEventListener(LINK_EVENT[eventName], eventListener);
    return () => this.et.removeEventListener(type, eventListener);
  }
}

export const linkEvents = new LinkEvents();
