import useAuth from "../../hooks/useAuth";

export const CommentPublication = (publicationId) => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');
    
  return (
    <div>CommentPublication</div>
  )
}
