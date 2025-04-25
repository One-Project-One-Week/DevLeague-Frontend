'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { adminApi } from '@/lib/axios';
import { useAdminAuth } from '@/app/admin/contexts/AdminAuthContext';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { number } from 'framer-motion';

// Add debounce function for input stability
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Create a memoized feedback component that won't re-render unnecessarily
function FeedbackTextarea({ teamId, value, onChange }) {
  const [localValue, setLocalValue] = useState(value || '');

  // Create a debounced update function
  const debouncedUpdate = useCallback(
    debounce((teamId, value) => {
      onChange(teamId, value);
    }, 300),
    [onChange]
  );

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedUpdate(teamId, newValue);
  };

  return (
    <Textarea
      placeholder="Write feedback..."
      value={localValue}
      onChange={handleChange}
      className="min-w-[180px] max-w-[220px] text-sm h-24 resize-none"
    />
  );
}

export default function HackathonDetailPage() {
  const { hackid } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch hackathon data
        const hackResponse = await adminApi.get(`/admin/hackathons/${hackid}`);
        if (hackResponse.status === 200) {
          setHackathon(hackResponse.data);
        }

        // Fetch submissions data
        const submissionsResponse = await adminApi.get(
          `/admin/hackathons/${hackid}/submissions`
        );
        if (submissionsResponse.status === 200) {
          const submissions =
            submissionsResponse.data.data || submissionsResponse.data;
          // Inspect the first item to see all available fields
          const fetchedTeams = submissions.map((reg, i) => {
            const submissionId = reg.subId;
            // Find placement - might be in different fields depending on API structure
            let placementValue = reg.placement;
            return {
              id: reg.id, // Team ID
              submissionId: submissionId, // Submission ID
              teamName: reg.team_name,
              projectLink: reg.repo_link,
              number: i + 1,
              placement: reg.placement || 'none', // Original placement from API, with default
              rank: placementValue || 'none', // Current UI state (may be modified)
              remark: reg.feedback || '',
            };
          });
          setTeams(fetchedTeams);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hackid, isAuthenticated, router]);

  // Define columns outside of any conditional logic
  const columns = [
    {
      accessorKey: 'number',
      header: '#',
      cell: ({ row }) => row.original.number,
    },
    {
      accessorKey: 'teamName',
      header: 'Team Name',
      cell: ({ row }) => (
        <div className="max-w-[180px] truncate">{row.original.teamName}</div>
      ),
    },
    {
      accessorKey: 'projectLink',
      header: 'Project',
      cell: ({ row }) =>
        row.original.projectLink ? (
          <a
            href={row.original.projectLink}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            View
          </a>
        ) : (
          <span className="text-gray-500 italic text-sm">Not yet</span>
        ),
    },
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: ({ row }) => {
        const teamId = row.original.id;
        const submissionId = row.original.submissionId;
        const currentPlacement = row.original.placement;
        const currentRank = row.original.rank;
        const allRanks = ['1st', '2nd', '3rd'];

        // Only show select box if submission ID exists
        if (!submissionId) {
          return (
            <span className="text-gray-500 italic text-sm">No submission</span>
          );
        }

        // If placement already exists, just show it as text
        if (currentPlacement && currentPlacement !== 'none') {
          return (
            <div className="font-medium text-blue-600">{currentPlacement}</div>
          );
        }

        // Otherwise show the select input
        return (
          <Select
            value={currentRank && currentRank !== 'none' ? currentRank : 'none'}
            onValueChange={(value) => handleRankChange(teamId, value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Assign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {allRanks.map((rank) => (
                <SelectItem key={rank} value={rank}>
                  {rank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: 'remark',
      header: 'Feedback',
      cell: ({ row }) => {
        const teamId = row.original.id;
        const submissionId = row.original.submissionId;
        const currentPlacement = row.original.placement;
        const currentFeedback = row.original.remark || '';

        // Only show feedback box if submission ID exists
        if (!submissionId) {
          return (
            <span className="text-gray-500 italic text-sm">No submission</span>
          );
        }

        // If placement already exists, show feedback as text
        if (currentPlacement && currentPlacement !== 'none') {
          return (
            <div className="text-sm max-w-[220px] max-h-24 overflow-auto">
              {currentFeedback || 'No feedback provided'}
            </div>
          );
        }

        // Otherwise show the feedback textarea
        return (
          <FeedbackTextarea
            teamId={teamId}
            value={currentFeedback}
            onChange={handleRemarkChange}
          />
        );
      },
    },
  ];

  // Always initialize the table with teams (empty array if not loaded)
  const table = useReactTable({
    data: teams,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleRankChange(teamId, newRank) {
    // Find current team's data
    const currentTeam = teams.find((t) => t.id === teamId);
    if (!currentTeam) {
      console.error('Could not find team with ID:', teamId);
      return;
    }

    // Don't proceed if there is no submission ID
    if (!currentTeam.submissionId) {
      console.error('Cannot rank a team without a submission ID');
      return;
    }

    // Don't modify teams that already have a placement
    if (currentTeam.placement && currentTeam.placement !== 'none') {
      console.error('Cannot modify a team that already has a placement');
      return;
    }

    // Get previous rank
    const currentRank = currentTeam.rank;

    // Find any team that has the new rank and clear it
    if (newRank && newRank !== 'none') {
      setTeams((prev) =>
        prev.map((t) =>
          // Only clear ranks from teams that don't have permanent placements
          t.rank === newRank && !t.placement ? { ...t, rank: null } : t
        )
      );
    }

    // Update teams state with new rank
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? { ...t, rank: newRank !== 'none' ? newRank : null }
          : t
      )
    );
  }

  function handleRemarkChange(teamId, remark) {
    // Find the team data
    const team = teams.find((t) => t.id === teamId);
    if (!team || !team.submissionId) {
      console.error('Cannot update feedback for team without a submission ID');
      return;
    }

    // Don't modify teams that already have a placement
    if (team.placement && team.placement !== 'none') {
      console.error(
        'Cannot modify feedback for a team that already has a placement'
      );
      return;
    }

    // Update teams state
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, remark } : t))
    );
  }

  async function handleSubmitRankings() {
    setSubmitting(true);
    try {
      let success = true;

      // Process all teams with ranks (where rank was changed in the UI)
      // Only include teams that don't already have a placement
      const rankedTeams = teams.filter(
        (team) =>
          team.rank &&
          team.rank !== 'none' &&
          team.submissionId &&
          // Only include teams where the UI rank is different from the original placement
          team.rank !== team.placement
      );

      // Process each ranked team
      for (const team of rankedTeams) {
        try {
          const response = await adminApi.patch(
            `/admin/submission/${team.submissionId}`,
            {
              placement: team.rank,
              feedback: team.remark || '',
            }
          );

          if (response.status !== 200 && response.status !== 201) {
            success = false;
            console.error(`Failed to update ${team.rank} place submission`);
          }
        } catch (error) {
          success = false;
          console.error(`Error updating ${team.rank} place:`, error);
        }
      }

      if (success) {
        alert('Rankings submitted successfully!');
        // Reload the data to get the updated placements
        window.location.reload();
      } else {
        alert('There were issues submitting some rankings');
      }
    } catch (error) {
      console.error('Error submitting rankings:', error);
      alert('Error submitting rankings: ' + (error.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  }

  // Don't render until data is loaded
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading hackathon data...</p>
        </div>
      </div>
    );
  }

  // Ensure hackathon data exists
  if (!hackathon) {
    return (
      <div className=" flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Hackathon not found</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/admin/dashboard/hackathon')}
          >
            Return to Hackathons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{hackathon.name}</h1>

        {teams.length > 0 ? (
          <>
            <div className="rounded-md border overflow-hidden">
              <Table className="w-full">
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id} className="bg-gray-50">
                      {hg.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="px-3 py-2 text-sm font-medium"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-3 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-end">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button disabled={submitting} size="sm">
                    {submitting ? 'Submitting...' : 'Submit Rankings'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to submit these rankings and
                      feedback?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex justify-end space-x-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmitRankings}>
                      Confirm
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No submissions yet for this hackathon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
