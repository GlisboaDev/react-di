export interface TimeApi {
  getTime: () => Promise<Date>;
}

export interface TimeResponse {
  datetime: string;
  raw_offset: number;
  unixtime: number;
  utc_datetime: string;
}

export const WorldTime: TimeApi = {
  getTime: async () => {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    const jsonResponse: TimeResponse = await response.json();
    const date = new Date(
      (jsonResponse.unixtime + jsonResponse.raw_offset) * 1000
    );
    return date;
  },
};

export const MockTime: TimeApi = {
  getTime: async () => {
    return new Date(100);
  },
};
