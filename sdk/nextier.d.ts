// Nextier Data Engine SDK · v0.1.0 · TypeScript definitions for nextier.mjs

export declare const VERSION: string;
export declare const DEFAULT_BASE_URL: string;

export interface NextierOptions {
  /** Your Data Engine key (de_live_…). Server-side only. */
  apiKey: string;
  baseUrl?: string;
  /** Retries for GET requests on 429 / 5xx / network errors. Default 2. Pushes are never retried. */
  retries?: number;
  /** Per-request timeout in ms. Default 30000. */
  timeoutMs?: number;
  fetch?: typeof fetch;
}

export declare class NextierError extends Error {
  status: number | null;
  body: { error?: string; hint?: string; [k: string]: unknown } | null;
  method: string | null;
  path: string | null;
}

export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  phone_type: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  county: string | null;
  source_tag: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string | null;
}

export interface Signal {
  id: string;
  /** e.g. NET_NEW_PRE_FORECLOSURE, NET_NEW_AUCTION, NET_NEW_LIS_PENDENS */
  event_type: string;
  field_name: string | null;
  property_id: string | null;
  lead_id: string | null;
  detected_at: string;
  /** e.g. distress, occupancy, mls */
  signal_family: string | null;
  cadence: string | null;
  /** verified_net_new | baseline_inventory */
  truth_class: string | null;
}

export interface FieldDescriptor {
  field: string;
  kind: "static" | "dynamic";
  triggerReady: boolean;
  cadence: "daily" | "weekly" | "monthly" | "none";
  triggerEvent?: string;
  source: string;
  label: string;
}

export interface InfoResponse {
  ok: true;
  product: string;
  version: string;
  teamId: string;
  endpoints: Record<string, string>;
  note: string;
  auth: string;
}

export interface FieldsResponse {
  ok: true;
  teamId: string;
  total: number;
  static: number;
  dynamic: number;
  triggerReady: number;
  fields: FieldDescriptor[];
}

export interface NetNewResponse {
  ok: true;
  teamId: string;
  since: string;
  count: number;
  signals: Signal[];
}

export interface LeadsResponse {
  ok: true;
  teamId: string;
  count: number;
  limit: number;
  offset: number;
  leads: Lead[];
}

export interface TagResponse {
  ok: true;
  updated: number;
}

export interface UpdateResponse {
  ok: true;
  updated: number;
  appliedColumns: string[];
  rejectedColumns?: string[];
}

export interface AutotagResponse {
  ok: true;
  tagged: number;
  mode: "origin" | "dynamic";
  /** count of leads that received each label in this run */
  breakdown: Record<string, number>;
}

export interface InitialSmsPushResponse {
  ok: true;
  blockId: string;
  leadCount: number;
  requestedLeadCount: number;
  ineligibleCount: number;
  launchUrl: string;
  [k: string]: unknown;
}

export interface ContactCenterPushResponse {
  ok: true;
  pushedCount: number;
  requestedLeadCount: number;
  ineligibleCount: number;
  dialerUrl: string;
}

export interface DialerLeadRow {
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  zipCode?: string;
  notes?: string;
  phoneType?: string;
  dnc?: boolean;
  tcpa?: boolean;
}

export interface DialerPushResponse {
  ok: true;
  pushedCount: number;
  requestedLeadCount: number;
  createdCount: number;
  matchedCount: number;
  invalidCount: number;
  ineligibleCount: number;
  leadIds: string[];
  dialerUrl: string;
}

export interface LeadFilters {
  search?: string;
  tag?: string;
  sourceTag?: string;
}

export declare class Nextier {
  constructor(opts: NextierOptions);
  info(): Promise<InfoResponse>;
  fields(): Promise<FieldsResponse>;
  signals: {
    netNew(opts?: { since?: string; limit?: number; family?: string }): Promise<NetNewResponse>;
  };
  leads: {
    list(opts?: LeadFilters & { limit?: number; offset?: number }): Promise<LeadsResponse>;
    listAll(opts?: LeadFilters & { offset?: number }): AsyncGenerator<Lead, void, unknown>;
    tag(opts: { leadIds: string[]; addTags?: string[]; removeTags?: string[] }): Promise<TagResponse>;
    update(opts: {
      leadIds: string[];
      set: { priority?: string; score?: number; notes?: string; campaign_name?: string };
    }): Promise<UpdateResponse>;
    autotag(opts?: { leadIds?: string[]; limit?: number; mode?: "origin" | "dynamic" }): Promise<AutotagResponse>;
    score(opts?: { leadIds?: string[]; limit?: number; mode?: "origin" | "dynamic" }): Promise<AutotagResponse>;
  };
  push: {
    initialSms(opts: { leadIds: string[]; name?: string; signalType?: string }): Promise<InitialSmsPushResponse>;
    contactCenter(opts: { leadIds: string[] }): Promise<ContactCenterPushResponse>;
    dialer(opts: { leads?: DialerLeadRow[]; leadIds?: string[] }): Promise<DialerPushResponse>;
  };
}

export default Nextier;
