import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from 'moment'

function Messages() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
     queryKey: ["conversations"],
     queryFn: () =>
       newRequest.get(`/conversations`).then((res) => {
         return res.data;
       }),
  }); 
  
  const mutation = useMutation({
    mutationFn: (id) => {
       return newRequest.put(`/conversations/${id}`)
    },
     onSuccess: () => {
       queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
       "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
                <tr
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer) ? "active" : undefined
                  }
                  key={c.id}
                >
                  <td>{currentUser.isSeller ? c.sellerId : c.buyerId}</td>
                  <td>
                    <Link className="link" to={`/message/${c.id}`}>
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={()=>handleRead(c.id)}>Mark as Read</button>
                    )}
                  </td>
                </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default Messages;
