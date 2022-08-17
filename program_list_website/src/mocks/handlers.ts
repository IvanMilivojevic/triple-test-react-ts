import { rest } from "msw";
import testDataPrograms from "../server/db.base.json";

export const handlers = [
  rest.get("http://localhost:4002/programs", (req, res, ctx) => {
    const status = req.url.searchParams.get("status");
    let programsResult = testDataPrograms.programs;

    if (status) {
      programsResult = programsResult.filter((program) => program.status === status);
    }

    return res(ctx.json(programsResult));
  }),
];
