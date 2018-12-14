import {Router, Request, Response} from 'express';


export var router = Router();

router.get('/mensajes',(req:Request,res:Response)=>{
    res.status(200).send({ok:true,
                    mensjae:"mensaje correcto"
    });
});
router.post('/mensajes',(req:Request,res:Response)=>{
    var entrada = req.body.entrada;
    res.status(200).send(
        {ok:true,
          mensjae:"mensaje correcto",
          entrada: entrada,
    });

    router.post('/mensajes/:id',(req:Request,res:Response)=>{
        var entrada = req.body.entrada;
        var id = req.params.id;
        res.status(200).send(
            {ok:true,
              mensjae:"mensaje correcto",
              entrada: entrada,
              id:id,
    });


    });
});
