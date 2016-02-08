/*****************************************************************************
 * Open MCT Web, Copyright (c) 2009-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define,Promise*/

/**
 * Module defining ExportTimelineAsCSVTask. Created by vwoeltje on 2/8/16.
 */
define([
    "TimelineTraverser"
], function (TimelineTraverser, TimelineCSVExporter) {
    "use strict";

    /**
     *
     * @constructor
     * @memberof {platform/features/timeline}
     * @implements {Task}
     */
    function ExportTimelineAsCSVTask(exportService, domainObject) {
        this.domainObject = domainObject;
        this.exportService = exportService;
    }

    ExportTimelineAsCSVTask.prototype.run = function (progress) {
        var name = this.domainObject.getModel().name,
            exportService = this.exportService;

        function doExport(objects) {
            var exporter = new TimelineCSVExporter(objects);
            return exportService.exportCSV(
                exporter.rows(),
                exporter.options()
            );
        }

        progress({
            title: "Preparing to export " + name
        });

        return new TimelineTraverser().buildObjectList()
            .then(doExport);
    };

    return ExportTimelineAsCSVTask;
});