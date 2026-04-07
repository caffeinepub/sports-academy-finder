import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Loader2, RefreshCw, Users } from "lucide-react";
import { useGetAllEnrollments } from "../hooks/useQueries";

function formatDate(nanos: bigint): string {
  try {
    return new Date(Number(nanos) / 1_000_000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

const SPORT_COLORS: Record<string, string> = {
  Basketball: "bg-orange-100 text-orange-800 border-orange-200",
  Soccer: "bg-green-100 text-green-800 border-green-200",
  Tennis: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Swimming: "bg-blue-100 text-blue-800 border-blue-200",
  Volleyball: "bg-purple-100 text-purple-800 border-purple-200",
};

export function AdminPanel() {
  const {
    data: enrollments,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetAllEnrollments();

  return (
    <section className="py-10 px-4" data-ocid="admin.panel">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Enrollment Submissions</h2>
              <p className="text-sm text-muted-foreground">
                {enrollments
                  ? `${enrollments.length} total enrollment${enrollments.length !== 1 ? "s" : ""}`
                  : "Loading..."}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            data-ocid="admin.secondary_button"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {isLoading && (
          <div
            className="flex items-center justify-center py-16 gap-3 text-muted-foreground"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading enrollments...</span>
          </div>
        )}

        {error && (
          <div
            className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive"
            data-ocid="admin.error_state"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">
              Failed to load enrollments. Please refresh and try again.
            </span>
          </div>
        )}

        {!isLoading && !error && enrollments && enrollments.length === 0 && (
          <div className="text-center py-16" data-ocid="admin.empty_state">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-lg font-medium text-muted-foreground">
              No enrollments yet
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Enrollment submissions will appear here once users sign up.
            </p>
          </div>
        )}

        {!isLoading && !error && enrollments && enrollments.length > 0 && (
          <div
            className="rounded-xl border bg-card overflow-hidden"
            data-ocid="admin.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Full Name</TableHead>
                  <TableHead className="font-semibold">Age</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Address</TableHead>
                  <TableHead className="font-semibold">Academy</TableHead>
                  <TableHead className="font-semibold">Sport</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment, index) => (
                  <TableRow
                    key={enrollment.id.toString()}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.item.${index + 1}`}
                  >
                    <TableCell className="text-muted-foreground text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {enrollment.fullName}
                    </TableCell>
                    <TableCell>{enrollment.age.toString()}</TableCell>
                    <TableCell className="text-sm">
                      {enrollment.phone}
                    </TableCell>
                    <TableCell
                      className="text-sm max-w-[180px] truncate"
                      title={enrollment.address}
                    >
                      {enrollment.address}
                    </TableCell>
                    <TableCell
                      className="text-sm max-w-[160px] truncate"
                      title={enrollment.academyName}
                    >
                      {enrollment.academyName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${SPORT_COLORS[enrollment.sport] ?? ""}`}
                      >
                        {enrollment.sport}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(enrollment.submittedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}
