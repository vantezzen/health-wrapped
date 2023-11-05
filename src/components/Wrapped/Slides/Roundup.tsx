import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import getShareUrl from "@/lib/utils/getShareUrl";
import { Loader2, Share2 } from "lucide-react";
import shareImage from "@/lib/utils/shareImage";
import { trackEvent } from "@/lib/analytics";
import Projects from "@/components/Projects";

function Roundup({ statistics }: WrappedSlideProps) {
  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);

  const excerciseTime = formatTimeLength(
    statistics.activity.totalExcerciseTime! / 1000
  );
  const handwashTime = formatTimeLength(
    statistics.handwash.totalHandwashDuration! / 1000
  );
  const longestSleep = formatTimeLength(
    (statistics.sleep.longestSleep?.[1] ?? 0) / 1000
  );
  const totalSleep = formatTimeLength(statistics.sleep.totalSleep! / 1000);

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <div className="md:p-12">
        <h1 className="text-2xl font-black text-starship-400 animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          And you did so much more...
        </h1>

        <div className="w-4xl dark text-zinc-200 text-left">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Activity</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total steps</TableCell>
                <TableCell>{statistics.activity.totalSteps}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total excercise time
                </TableCell>
                <TableCell>
                  {excerciseTime.amount} {excerciseTime.unit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total walking distance
                </TableCell>
                <TableCell>
                  {statistics.activity.walkingRunning.totalDistance}{" "}
                  {statistics.activity.walkingRunning.distanceUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Max. walking distance at once
                </TableCell>
                <TableCell>
                  {statistics.activity.walkingRunning.maxDistance}{" "}
                  {statistics.activity.walkingRunning.distanceUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Flights climbed</TableCell>
                <TableCell>
                  {statistics.activity.flightsClimbed.totalDistance}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Max. flights climbed at once
                </TableCell>
                <TableCell>
                  {statistics.activity.flightsClimbed.maxDistance}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  Total swimming distance
                </TableCell>
                <TableCell>
                  {statistics.activity.swimming.totalDistance}{" "}
                  {statistics.activity.swimming.distanceUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Max. swimming distance at once
                </TableCell>
                <TableCell>
                  {statistics.activity.swimming.maxDistance}{" "}
                  {statistics.activity.swimming.distanceUnit}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  Total cycling distance
                </TableCell>
                <TableCell>
                  {statistics.activity.cycling.totalDistance}{" "}
                  {statistics.activity.cycling.distanceUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Max. cycling distance at once
                </TableCell>
                <TableCell>
                  {statistics.activity.cycling.maxDistance}{" "}
                  {statistics.activity.cycling.distanceUnit}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Audio</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Exposure Events</TableCell>
                <TableCell>{statistics.audio.audioExposureEvents}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Max. Loudness</TableCell>
                <TableCell>
                  {statistics.audio.maxEnvironmentalAudioExposure}dB
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Handwash</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total amount</TableCell>
                <TableCell>{statistics.handwash.handwashAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total duration</TableCell>
                <TableCell>
                  {handwashTime.amount} {handwashTime.unit}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Heart</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Max. Heart Rate</TableCell>
                <TableCell>{statistics.heart.maxHeartRate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Min. Heart Rate</TableCell>
                <TableCell>{statistics.heart.minHeartRate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Day with highest avg. heart rate
                </TableCell>
                <TableCell>
                  {statistics.heart.dayWithHighestAverageHeartRate[0]} (
                  {statistics.heart.dayWithHighestAverageHeartRate[1]} bpm)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Day with lowest avg. heart rate
                </TableCell>
                <TableCell>
                  {statistics.heart.dayWithLowestAverageHeartRate[0]} (
                  {statistics.heart.dayWithLowestAverageHeartRate[1]} bpm)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Sleep</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total sleep</TableCell>
                <TableCell>
                  {totalSleep.amount} {totalSleep.unit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Naps taken</TableCell>
                <TableCell>{statistics.sleep.totalNapsTaken}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Longest sleep</TableCell>
                <TableCell>
                  {longestSleep.amount} {longestSleep.unit} (
                  {statistics.sleep.longestSleep?.[0]})
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              const url = getShareUrl(statistics);
              await shareImage(url);
              trackEvent("share_image");

              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share image
              </>
            )}
          </Button>

          <Projects />
        </div>
      </div>
    </WrappedContainer>
  );
}

export default Roundup;
