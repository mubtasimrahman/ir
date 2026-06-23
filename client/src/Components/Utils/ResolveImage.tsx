function ResolveImage(filename: string): string {
    return new URL(`../../assets/featuredProjects/${filename}`, import.meta.url)
      .href;
  }

  export default ResolveImage

  /*This allows relative paths from json to be resolved and not just left as strings.
  The dynamic part {filename} works as long as it is deterministic(vite knows all options
  and is not determined during runtime eg, user input and fetch reqs)*/