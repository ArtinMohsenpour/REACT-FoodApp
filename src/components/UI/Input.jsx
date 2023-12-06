export default function Input({ lable, id, ...props }) {
  return (
    <p className="control">
      <lable htmlFor={id}>{lable}</lable>
      <input id={id} name={id} required {...props}/>
    </p>
  );
}
