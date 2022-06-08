import React from "react";

//Components
import Table from '../components/Table'

export default function Home() {
    return (
        <div style={{padding:"100px"}}>
            <Table users={[]} />
        </div>
    )
}