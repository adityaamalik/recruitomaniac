import type { Metadata } from "next";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | Recruitomaniac",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
