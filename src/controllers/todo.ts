// deno-lint-ignore-file no-explicit-any

import  db from "../config/database.ts";


const tasks = db.collection('tasks');


const getAll = async({

   response
}: {
  
  response: any;
}) => {
  const data = await tasks.find();

  response.status = 200;
  response.body = {
  success: true,
  message: 'Get all Data',
  data: data
}
}

const insertOne = async({

  response, request
}: {
 response: any;
 request: any;
}) => {
  const body = await request.body();
  const data = body.value;

  await tasks.insertOne(data);


  response.status = 201;
  response.body = {
  success: true,
  message: 'task created!',
  data: data
}

}

const findOne = async({
   response, params
}: {
   response: any,
   params: any,
}) => {
    const data = await tasks.findOne({
    _id: {
       $oid: params.id
   }
   });

   response.status = 200;
   response.body = {
   success: true,
   message: 'get one task!',
   data: data
 }
}

const updateOne = async({
 response, params, request
}: {
  response:any;
  params:any;
  request:any;
}) => {

    const body = await request.body();
    const data = body.value;

    await tasks.updateOne(
      
      {
      
       _id: {
         $oid: params.id
      }
      },
      {
        $set: {
            ...data
      }
      }
      );

      const result = await tasks.findOne({
      _id: {
         $oid: params.id
      }
      });

      response.status = 200;
      response.body = {
      success: true,
      message: 'update one task',
      data: result
      }
}

const deleteOne = async({
 response,params
}: {

  response: any;
  params: any;
}) => {
    await tasks.deleteOne({
    _id: {
     $oid: params.id
   }
   });

   response.status = 200;
   response.body = {
   success: true,
   message: 'delete one task',
   data: null
   }

}
export { getAll, insertOne, findOne, updateOne, deleteOne };