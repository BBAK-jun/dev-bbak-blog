type Props = {
  id: string
}

const YouTube = ({ id }: Props) => {
  return (
    <div>
      <iframe
        className="aspect-video w-full"
        src={'https://www.youtube.com/embed/' + id}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}

export default YouTube
