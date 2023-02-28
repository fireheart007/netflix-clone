import React, { Suspense, useEffect } from "react";
import { ENDPOINT } from "../common/endpoints";
import Banner from "../components/banner";
import ContentRow from "../components/content-rows";
import Loader from "../components/loader";

export default function Browse() {
  return (
    <Suspense fallback={<Loader/>}>
      <section className="absolute top-0">
        <Banner />
        <ContentRow endpoint={ENDPOINT.MOVIES_POPULAR} title="Popular" />
        <ContentRow endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
        <ContentRow
          endpoint={ENDPOINT.MOVIES_NOW_PLAYING}
          title="Now Playing"
        />
      </section>
    </Suspense>
  );
}
