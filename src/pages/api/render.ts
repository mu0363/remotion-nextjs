import { AwsRegion, getFunctions } from "@remotion/lambda";
import { NextApiRequest, NextApiResponse } from "next";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
type CustomRequest = Override<NextApiRequest, { body: string }>;

export type Finality =
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      errors: string;
    };

export type Render = {
  renderId: string | null;
  region: AwsRegion;
  username: string;
  bucketName: string | null;
  finality: Finality | null;
  functionName: string;
  account: number | undefined;
};

export default async function handler(req: CustomRequest, res: NextApiResponse) {
  const body = (await JSON.parse(req.body)) as string;
  const region = "us-east-1";
  const [first] = await getFunctions({
    compatibleOnly: true,
    region,
  });
  // console.log(first.functionName);

  res.status(200).json(body);
}
