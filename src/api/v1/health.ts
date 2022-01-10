import { Request, Response, Router } from "express";
import { clients } from "../../socket/store";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.json({
    status: "ok",
    clients: clients,
    totalClients: clients.length,
  });
});

export default router;
