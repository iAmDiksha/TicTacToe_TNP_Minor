function Block({value,onSmash})
{
    return (
        <div onClick={onSmash} className="block">
            {value}
        </div>
    )
}

export default Block;