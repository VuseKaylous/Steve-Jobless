import Image from 'next/image';

const Found = () => {
  return (
    <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center" style={{minHeight: "200px"}}>
      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <p className="mx-auto h5 fw-bold m-0">A driver found!</p>
        </div>
        <div className="toast-body d-flex flex-column align-items-center">
          <Image src="/crab.png" className="rounded mr-2" width={50} height={50} alt="..."/>
          <p className="h6 fw-bold m-0">Nguyen Van A</p>
          <p className="h7 fw-bold m-0">51A-123.52</p>
          <p className="h8">CrabBike</p>
        </div>
      </div>
    </div>
  )
}

export default Found;
