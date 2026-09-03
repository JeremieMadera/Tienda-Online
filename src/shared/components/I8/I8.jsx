export default function I8({ name, size = 22, color = "17120B", style }) {
  return (
    <img
      src={`https://img.icons8.com/ios/${size}/${color}/${name}.png`}
      alt={name}
      width={size}
      height={size}
      style={{ display: "block", ...style }}
    />
  );
}
