import axios from "axios";

export async function createTimeLog(timeLogData: any): Promise<any> {
  const token = localStorage.getItem("user");

  const resp = await axios.post("time-log/create", 
    JSON.stringify(timeLogData),
    {
      headers:
      {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    }
  );

  const results = await resp.data;
  return results;
}

function formatTime(timeInSeconds: number): {} {
  let hours = Math.floor(timeInSeconds / (60 * 60));

  let divisor_for_minutes = timeInSeconds % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let strHours = hours < 10 ? "0" + hours.toString() : hours.toString();
  let strMinutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  let strSeconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return strHours + ":" + strMinutes + ":" + strSeconds;
}

export async function getTimeLogs(): Promise<any> {
  const token = localStorage.getItem("user");

  const resp = await axios.get("time-log",
    {
      headers:
      {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    }
  );

  let results = await resp.data;

  results = results.map((tl: any) => (
    {
      id: tl.id,
      userId: tl.userId,
      duration: formatTime(tl.duration),
      category: tl.category,
      description: tl.description
    }
  ));

  return results;
}

export async function deleteTimeLog(id: number): Promise<any> {
  const token = localStorage.getItem("user");

  const resp = await axios.delete("time-log/delete/" + id,
    {
      headers:
      {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    }
  );

  let results = await resp.data;

  return results;
}
