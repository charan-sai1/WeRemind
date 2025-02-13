/* eslint-disable react/prop-types */
export default function TestiminiCard(props) {
    return (
        <div className='testimini-card'>
                <img src={props.Image} alt="" />
                <p className="Test-name">{props.name}</p>
                <p className="Test-work">{props.work}</p>
                <p className="Test-test">{props.test}</p>
        </div>
    )
}