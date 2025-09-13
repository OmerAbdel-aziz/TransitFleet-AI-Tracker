import { RouteLayout } from "@/features/route-optimizer/components/route-layout"

// interface RoutePageProps { params: { routeId: string } }
export default function RoutePage({ params }: { params: { routeId: string } }) {
  return <RouteLayout routeId={params.routeId} />
}
