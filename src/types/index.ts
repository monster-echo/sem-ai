import { z } from "zod";

// Machine Status Enum
export const MachineStatusEnum = z.enum([
  "RUNNING",
  "IDLE",
  "ALARM",
  "OFFLINE",
]);
export type MachineStatus = z.infer<typeof MachineStatusEnum>;

// Machine Schema
export const MachineSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: MachineStatusEnum,
  product: z.string(),
  progress: z.number(),
  rpm: z.number(),
  load: z.number(),
  zone: z.string(),
});
export type Machine = z.infer<typeof MachineSchema>;

// Hourly Data Schema
export const HourlyDataSchema = z.object({
  time: z.string(),
  target: z.number(),
  actual: z.number(),
  cumulativeTarget: z.number(),
  cumulativeActual: z.number(),
  efficiency: z.number(),
});
export type HourlyData = z.infer<typeof HourlyDataSchema>;

// Deviation Data Schema
export const DeviationDataSchema = z.object({
  name: z.string(),
  standardCT: z.number(),
  actualCT: z.number(),
  deviation: z.number(),
});
export type DeviationData = z.infer<typeof DeviationDataSchema>;

// Zone Performance Schema
export const ZonePerformanceSchema = z.object({
  subject: z.string(),
  A: z.number(),
  B: z.number(),
  fullMark: z.number(),
});
export type ZonePerformance = z.infer<typeof ZonePerformanceSchema>;

// Maintenance Record Schema
export const MaintenanceRecordSchema = z.object({
  id: z.string(),
  machine: z.string(),
  type: z.string(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  date: z.string(),
  technician: z.string(),
});
export type MaintenanceRecord = z.infer<typeof MaintenanceRecordSchema>;

// Alarm History Schema
export const AlarmHistorySchema = z.object({
  id: z.string(),
  machine: z.string(),
  code: z.string(),
  message: z.string(),
  time: z.string(),
  level: z.enum(["CRITICAL", "WARNING", "INFO"]),
});
export type AlarmHistory = z.infer<typeof AlarmHistorySchema>;

// Notification Schema
export const NotificationTypeEnum = z.enum([
  "ALARM",
  "INFO",
  "SUCCESS",
  "ERROR",
]);
export type NotificationType = z.infer<typeof NotificationTypeEnum>;

export const NotificationSchema = z.object({
  id: z.string(),
  type: NotificationTypeEnum,
  title: z.string(),
  message: z.string(),
  time: z.string(),
  level: z.enum(["CRITICAL", "WARNING", "INFO"]).optional(), // For alarms
});
export type Notification = z.infer<typeof NotificationSchema>;

// Asset Schema
export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  location: z.string(),
  purchaseDate: z.string(),
  status: z.enum(["ACTIVE", "MAINTENANCE"]),
  value: z.number(),
  warrantyExp: z.string(),
});
export type Asset = z.infer<typeof AssetSchema>;

// Gateway Schema
export const GatewaySchema = z.object({
  id: z.string(),
  name: z.string(),
  ip: z.string(),
  protocol: z.string(),
  status: z.enum(["ONLINE", "WARNING", "OFFLINE"]),
  devices: z.number(),
  throughput: z.string(),
  lastHeartbeat: z.string(),
});
export type Gateway = z.infer<typeof GatewaySchema>;

// Machine Status Config Schema (for UI display)
export const MachineStatusConfigSchema = z.object({
  label: z.string(),
  color: z.string(),
  text: z.string(),
  border: z.string(),
  shadow: z.string(),
  icon: z.any(), // ReactNode is hard to validate with Zod, using any for now or could use custom validation
});
export type MachineStatusConfig = z.infer<typeof MachineStatusConfigSchema>;
